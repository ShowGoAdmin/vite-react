import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { resetPasswordConfirm } from '@/lib/appwrite'; // Updated resetPasswordConfirm import
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be less than 128 characters'),
  confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams(); // Hook to access query parameters
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const userId = searchParams.get('userId');
  const secret = searchParams.get('secret');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    // Validate URL parameters on page load
    if (!userId || !secret) {
      toast({
        title: 'Error',
        description: 'Invalid or expired reset link.',
        variant: 'destructive',
      });
      navigate('/forgot-password'); // Redirect to forgot password page
    }
  }, [userId, secret, navigate, toast]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    try {
      if (userId && secret) {
        // Proceed with password recovery
        const result = await resetPasswordConfirm(data.password, data.confirmPassword, secret, userId);
        if (result.success) {
          toast({
            title: 'Success',
            description: 'Your password has been reset successfully. You can now log in.',
          });
          navigate('/login'); // Redirect to login page
        } else {
          toast({
            title: 'Error',
            description: 'Failed to reset the password.',
            variant: 'destructive',
          });
        }
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-md w-full px-6 py-8 bg-gray-900 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-8">Reset Password</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Input
              type="password"
              placeholder="New Password"
              {...register('password')}
              className="bg-gray-800 border-gray-700"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Confirm Password"
              {...register('confirmPassword')}
              className="bg-gray-800 border-gray-700"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </form>
      </div>
    </div>
  );
}
