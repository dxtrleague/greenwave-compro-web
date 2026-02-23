"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/v1/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();
            if (res.ok) {
                router.push("/admin");
            } else {
                setError(data.message || "Gagal login. Coba lagi.");
            }
        } catch (err) {
            setError("Kesalahan koneksi ke server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
                <h1 className="mb-2 text-center text-3xl font-bold text-[#016b62]">Admin Portal</h1>
                <p className="mb-8 text-center text-gray-500">Yayasan Greenwave Backend System</p>

                {error && (
                    <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#61B58E] focus:outline-none focus:ring-1 focus:ring-[#61B58E]"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="e.g. admin"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#61B58E] focus:outline-none focus:ring-1 focus:ring-[#61B58E]"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-[#61B58E] px-4 py-3 font-semibold text-white transition-colors hover:bg-[#357427] disabled:opacity-70"
                    >
                        {loading ? "Memproses..." : "Masuk ke Dashboard"}
                    </button>
                </form>
            </div>
        </div>
    );
}
