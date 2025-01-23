import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const result = await login(data.email, data.password);
      if (result.success) {
        toast({
          title: 'Welcome back!',
          description: 'Successfully logged in',
        });

        // Check if there's a redirect URL in localStorage
        const redirectUrl = localStorage.getItem('redirectUrl');
        if (redirectUrl) {
          localStorage.removeItem('redirectUrl'); // Remove URL after redirect
          navigate(redirectUrl); // Navigate to the stored URL
        } else {
          navigate('/'); // Default route after login (home page)
        }
      } else {
        toast({
          title: 'Login failed',
          description: result.error,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 px-4 sm:px-8 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md px-8 py-10 bg-black/40 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10"
      >
        <h2 className="text-3xl font-light text-center mb-5 text-white">Welcome Back</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Input
              type="email"
              placeholder="Email"
              {...register('email')}
              className="bg-black/50 border-white/10 focus:border-white/20 transition-all text-white"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Password"
              {...register('password')}
              className="bg-black/50 border-white/10 focus:border-white/20 transition-all text-white"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Link
              to="/forgot-password"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-black hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 border border-white/10 transition-all duration-300 ease-in-out hover:scale-105"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </Button>

          <p className="text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-white hover:text-pink-400 transition-colors">
              Sign up
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
