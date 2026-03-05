import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");

        try {
            const response = await fetch("http://localhost:3000/api/auth/send-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("OTP sent successfully to your email!");
                // In a real app we would navigate to OTP verification or show input here
            } else {
                setMessage(data.message || "Failed to send OTP");
            }
        } catch (error) {
            setMessage("Error connecting to server.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-3xl font-display font-bold tracking-tight text-slate-900">
                        Raksha
                    </span>
                </div>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-3xl sm:px-10 border border-slate-100">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div>
                            <h2 className="text-3xl font-display font-bold text-slate-900">
                                Welcome Back
                            </h2>
                            <p className="mt-2 text-sm text-slate-500">
                                Enter your email address to continue
                            </p>
                        </div>

                        <form onSubmit={handleSendOTP} className="space-y-6">
                            <div>
                                <div className="mt-1 relative rounded-xl shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none border-r border-slate-200 pr-3">
                                        <span className="text-slate-500 sm:text-sm font-medium">✉️</span>
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="flex-1 block w-full outline-none focus:ring-2 focus:ring-purple-500 min-w-0 rounded-xl sm:text-sm border-slate-200 py-4 pl-16 pr-4 bg-slate-50 text-slate-900 placeholder:text-slate-400"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {message && (
                                <p className={`text-sm ${message.includes("success") ? "text-emerald-500" : "text-rose-500"}`}>
                                    {message}
                                </p>
                            )}

                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                                >
                                    {isLoading ? 'Sending...' : 'Send OTP ->'}
                                </button>
                            </div>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-200" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-slate-500">
                                        or continue with
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <div>
                                    <button className="w-full inline-flex justify-center py-3 px-4 border border-slate-200 rounded-xl shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                                        <span className="sr-only">Sign in with Google</span>
                                        <span className="font-bold">G Google</span>
                                    </button>
                                </div>

                                <div>
                                    <button className="w-full inline-flex justify-center py-3 px-4 border border-slate-200 rounded-xl shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                                        <span className="sr-only">Sign in with Apple</span>
                                        <span className="font-bold">🍎 Apple</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
