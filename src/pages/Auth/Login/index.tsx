import {useState, useRef, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {motion, AnimatePresence} from 'framer-motion';

type Step = 'phone' | 'otp';

const Login = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<Step>('phone');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const handlePhoneSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (phone.length >= 10) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setStep('otp');
                setCountdown(60);
            }, 1000);
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const handleOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const otpValue = otp.join('');
        if (otpValue.length === 6) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                navigate('/dashboard');
            }, 1000);
        }
    };

    const handleResendOtp = () => {
        if (countdown === 0) {
            setCountdown(60);
        }
    };

    const handleEditPhone = () => {
        setStep('phone');
        setOtp(['', '', '', '', '', '']);
    };

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4"
        >
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        {step === 'phone' ? 'Welcome Back' : 'Verify OTP'}
                    </h1>
                    <p className="text-gray-600">
                        {step === 'phone'
                            ? 'Enter your phone number to continue'
                            : `We've sent a 6-digit code to +${phone}`}
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                    <AnimatePresence mode="wait">
                        {step === 'phone' ? (
                            <motion.form
                                key="phone"
                                initial={{opacity: 0, x: -20}}
                                animate={{opacity: 1, x: 0}}
                                exit={{opacity: 0, x: 20}}
                                onSubmit={handlePhoneSubmit}
                            >
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <div className="relative">
                                        <div
                                            className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                            <span className="text-gray-500">+88</span>
                                        </div>
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                            placeholder="Enter your phone number"
                                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                            maxLength={11}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={phone.length < 10 || isLoading}
                                    className="w-full py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10"
                                                        stroke="currentColor" strokeWidth="4"/>
                                                <path className="opacity-75" fill="currentColor"
                                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                            </svg>
                                            Sending OTP...
                                        </>
                                    ) : (
                                        'Continue'
                                    )}
                                </button>

                                <p className="text-center text-sm text-gray-600 mt-6">
                                    By continuing, you agree to our{' '}
                                    <Link to="/terms" className="text-amber-600 hover:text-amber-700">
                                        Terms of Service
                                    </Link>{' '}
                                    and{' '}
                                    <Link to="/privacy" className="text-amber-600 hover:text-amber-700">
                                        Privacy Policy
                                    </Link>
                                </p>
                            </motion.form>
                        ) : (
                            <motion.form
                                key="otp"
                                initial={{opacity: 0, x: 20}}
                                animate={{opacity: 1, x: 0}}
                                exit={{opacity: 0, x: -20}}
                                onSubmit={handleOtpSubmit}
                            >
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                                        Enter 6-digit OTP
                                    </label>
                                    <div className="flex gap-2 md:gap-3 justify-center">
                                        {otp.map((digit, index) => (
                                            <input
                                                key={index}
                                                ref={(el) => {
                                                    otpRefs.current[index] = el;
                                                }}
                                                type="text"
                                                inputMode="numeric"
                                                value={digit}
                                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                                className="w-10 h-12 md:w-12 md:h-14 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                                maxLength={1}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={otp.some(d => !d) || isLoading}
                                    className="w-full py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10"
                                                        stroke="currentColor" strokeWidth="4"/>
                                                <path className="opacity-75" fill="currentColor"
                                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                            </svg>
                                            Verifying...
                                        </>
                                    ) : (
                                        'Verify & Login'
                                    )}
                                </button>

                                <div className="mt-6 text-center space-y-3">
                                    <div className="text-sm text-gray-600">
                                        {countdown > 0 ? (
                                            <span>Resend OTP in {countdown}s</span>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={handleResendOtp}
                                                className="text-amber-600 hover:text-amber-700 font-medium"
                                            >
                                                Resend OTP
                                            </button>
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleEditPhone}
                                        className="text-sm text-gray-500 hover:text-gray-700"
                                    >
                                        Change phone number
                                    </button>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-8 text-center">
                    <Link to="/" className="text-gray-600 hover:text-gray-900 text-sm">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default Login;
