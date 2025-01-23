import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { account } from '../lib/appwrite'; // Importing account from appwrite.js
import { addUserToGroup } from '../lib/appwrite'; // Importing the addUserToGroup function

const AddToGroup = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [groupId, setGroupId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Check if the user is logged in
  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const session = await account.get(); // Get current user session
        setUserId(session.$id);
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    fetchUserSession();
  }, []);

  // Fetch groupId from URL query parameter
  useEffect(() => {
    const groupIdFromUrl = searchParams.get('groupId');
    if (groupIdFromUrl) {
      setGroupId(groupIdFromUrl);
    } else {
      setMessage('Invalid group ID. Please check the link.');
    }
  }, [searchParams]);

  // Handle joining the group
  const handleJoinGroup = async () => {
    if (!groupId) {
      setMessage('Group ID is missing.');
      return;
    }

    if (!isLoggedIn) {
      // Store the current URL in localStorage before redirecting to login
      localStorage.setItem('redirectUrl', window.location.href);
      navigate('/login');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      // Add user to the group
      const result = await addUserToGroup(groupId, userId);

      if (!result.success) {
        setMessage(result.error);
      } else {
        setMessage('Successfully joined the group!');
      }
    } catch (error) {
      setMessage(`Error joining group: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-800 to-black text-white p-6">
      <div className="max-w-md w-full bg-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">Join Group</h2>

        {message && (
          <div className="mb-4 text-center text-sm">
            <p>{message}</p>
          </div>
        )}

        {isLoggedIn ? (
          <>
            <p className="text-center mb-4">Click the button below to join the group.</p>
            <button
              onClick={handleJoinGroup}
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded-lg font-semibold"
            >
              {isLoading ? 'Joining...' : 'Join Group'}
            </button>
          </>
        ) : (
          <>
            <p className="text-center mb-4">Please log in to join the group.</p>
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg font-semibold"
            >
              Log In
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AddToGroup;
