"use client";

import { useEffect, useState } from "react";
import { PlusCircle, Trash2, Mail, BriefcaseBusiness, LogOut, Target, ShoppingBag, LayoutDashboard } from "lucide-react";
import { useRouter } from "next/navigation";

// Tipe Data
type ImpactMetric = {
    id: string;
    title: string;
    value: string;
    iconName: string | null;
    isActive: boolean;
};

type Collaboration = {
    id: string;
    companyName: string;
    focusArea: string;
    message: string;
    email: string;
    status: string;
    isEmailSent: boolean;
    createdAt: string;
};

type Program = {
    id: string;
    title: string;
    description: string;
    iconName: string | null;
    isActive: boolean;
};

type Product = {
    id: string;
    name: string;
    category: string;
    description: string;
    price: number;
    imageUrl: string | null;
    inStock: boolean;
};

export default function AdminDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"impact" | "collab" | "program" | "product">("impact");

    // Impact State
    const [metrics, setMetrics] = useState<ImpactMetric[]>([]);
    const [loadingMetrics, setLoadingMetrics] = useState(true);
    const [formVisible, setFormVisible] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newValue, setNewValue] = useState("");

    // Collaboration State
    const [collabs, setCollabs] = useState<Collaboration[]>([]);
    const [loadingCollabs, setLoadingCollabs] = useState(true);

    // Program State
    const [programs, setPrograms] = useState<Program[]>([]);
    const [loadingPrograms, setLoadingPrograms] = useState(true);
    const [progFormVisible, setProgFormVisible] = useState(false);
    const [progTitle, setProgTitle] = useState("");
    const [progDesc, setProgDesc] = useState("");

    // Product State
    const [products, setProducts] = useState<Product[]>([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [prodFormVisible, setProdFormVisible] = useState(false);
    const [prodName, setProdName] = useState("");
    const [prodCat, setProdCat] = useState("");
    const [prodDesc, setProdDesc] = useState("");
    const [prodPrice, setProdPrice] = useState("");

    // Initial Fetch
    useEffect(() => {
        if (activeTab === "impact") fetchMetrics();
        if (activeTab === "collab") fetchCollabs();
        if (activeTab === "program") fetchPrograms();
        if (activeTab === "product") fetchProducts();
    }, [activeTab]);

    // ==== FETCHERS ====
    const fetchMetrics = async () => {
        try {
            setLoadingMetrics(true);
            const res = await fetch("/api/v1/impact");
            const json = await res.json();
            if (json.status === "success") setMetrics(json.data.impactMetrics);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingMetrics(false);
        }
    };

    const fetchCollabs = async () => {
        try {
            setLoadingCollabs(true);
            const res = await fetch("/api/v1/collaborate");
            const json = await res.json();
            if (json.status === "success") setCollabs(json.data.collaborations);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingCollabs(false);
        }
    };

    const fetchPrograms = async () => {
        try {
            setLoadingPrograms(true);
            const res = await fetch("/api/v1/programs");
            const json = await res.json();
            if (json.status === "success") setPrograms(json.data.programs);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingPrograms(false);
        }
    };

    const fetchProducts = async () => {
        try {
            setLoadingProducts(true);
            const res = await fetch("/api/v1/products");
            const json = await res.json();
            if (json.status === "success") setProducts(json.data.products);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingProducts(false);
        }
    };

    // ==== ACTIONS ====
    const handleAddMetric = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle || !newValue) return;
        try {
            const res = await fetch("/api/v1/impact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: newTitle, value: newValue, iconName: "TrendingUp" }),
            });
            if (res.ok) {
                setFormVisible(false);
                setNewTitle("");
                setNewValue("");
                fetchMetrics();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteMetric = async (id: string) => {
        if (!confirm("Hapus metrik ini?")) return;
        try {
            const res = await fetch(`/api/v1/impact/${id}`, { method: "DELETE" });
            if (res.ok) setMetrics((prev) => prev.filter((m) => m.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddProgram = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!progTitle || !progDesc) return;
        try {
            const res = await fetch("/api/v1/programs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: progTitle, description: progDesc, iconName: "Target" }),
            });
            if (res.ok) {
                setProgFormVisible(false);
                setProgTitle("");
                setProgDesc("");
                fetchPrograms();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteProgram = async (id: string) => {
        if (!confirm("Hapus program ini?")) return;
        try {
            const res = await fetch(`/api/v1/programs/${id}`, { method: "DELETE" });
            if (res.ok) setPrograms((prev) => prev.filter((p) => p.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prodName || !prodCat || !prodDesc || !prodPrice) return;
        try {
            const res = await fetch("/api/v1/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: prodName, category: prodCat, description: prodDesc, price: prodPrice }),
            });
            if (res.ok) {
                setProdFormVisible(false);
                setProdName("");
                setProdCat("");
                setProdDesc("");
                setProdPrice("");
                fetchProducts();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if (!confirm("Hapus produk ini?")) return;
        try {
            const res = await fetch(`/api/v1/products/${id}`, { method: "DELETE" });
            if (res.ok) setProducts((prev) => prev.filter((p) => p.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdateCollabStatus = async (id: string, newStatus: string) => {
        try {
            const res = await fetch(`/api/v1/collaborate/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            if (res.ok) fetchCollabs();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteCollab = async (id: string) => {
        if (!confirm("Hapus permanen pengajuan ini?")) return;
        try {
            const res = await fetch(`/api/v1/collaborate/${id}`, { method: "DELETE" });
            if (res.ok) setCollabs((prev) => prev.filter((c) => c.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogout = () => {
        document.cookie = "admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push("/admin/login");
    }

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 border-r border-gray-200 bg-white p-6 md:flex md:flex-col hidden justify-between">
                <div>
                    <div className="mb-10 text-xl font-bold text-[#016b62]">Greenwave CMS</div>
                    <nav className="flex flex-col gap-2">
                        <button
                            onClick={() => setActiveTab("impact")}
                            className={`flex items-center gap-3 rounded-lg p-3 text-sm font-semibold transition-colors ${activeTab === "impact" ? "bg-[#E0F3EA] text-[#357427]" : "text-gray-500 hover:bg-gray-100"}`}
                        >
                            <LayoutDashboard size={18} /> Impact Metrics
                        </button>
                        <button
                            onClick={() => setActiveTab("program")}
                            className={`flex items-center gap-3 rounded-lg p-3 text-sm font-semibold transition-colors ${activeTab === "program" ? "bg-[#E0F3EA] text-[#357427]" : "text-gray-500 hover:bg-gray-100"}`}
                        >
                            <Target size={18} /> Programs
                        </button>
                        <button
                            onClick={() => setActiveTab("product")}
                            className={`flex items-center gap-3 rounded-lg p-3 text-sm font-semibold transition-colors ${activeTab === "product" ? "bg-[#E0F3EA] text-[#357427]" : "text-gray-500 hover:bg-gray-100"}`}
                        >
                            <ShoppingBag size={18} /> Products
                        </button>
                        <button
                            onClick={() => setActiveTab("collab")}
                            className={`flex items-center gap-3 rounded-lg p-3 text-sm font-semibold transition-colors ${activeTab === "collab" ? "bg-[#E0F3EA] text-[#357427]" : "text-gray-500 hover:bg-gray-100"}`}
                        >
                            <Mail size={18} /> Pesan Kolaborasi
                        </button>
                    </nav>
                </div>

                <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-medium text-red-500 p-3 hover:bg-red-50 rounded-lg transition-colors">
                    <LogOut size={18} /> Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                {/* IMPACT METRICS TAB */}
                {activeTab === "impact" && (
                    <>
                        <header className="mb-8 flex items-center justify-between">
                            <h1 className="text-3xl font-bold text-gray-800">Manajemen Dampak</h1>
                            <button
                                onClick={() => setFormVisible(!formVisible)}
                                className="flex items-center gap-2 rounded-lg bg-[#61B58E] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#357427]"
                            >
                                <PlusCircle size={18} /> Tambah Data
                            </button>
                        </header>

                        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden mb-8">
                            <table className="w-full text-left text-sm text-gray-600">
                                <thead className="bg-[#f8fcfb] text-xs uppercase text-gray-700">
                                    <tr>
                                        <th className="px-6 py-4">Title</th>
                                        <th className="px-6 py-4">Value</th>
                                        <th className="px-6 py-4 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loadingMetrics ? (
                                        <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500">Memuat Data...</td></tr>
                                    ) : metrics.length === 0 ? (
                                        <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500">Belum ada metrik.</td></tr>
                                    ) : (
                                        metrics.map((item) => (
                                            <tr key={item.id} className="border-b border-gray-100 bg-white hover:bg-gray-50">
                                                <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
                                                <td className="px-6 py-4 font-bold text-[#61B58E]">{item.value}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <button onClick={() => handleDeleteMetric(item.id)} className="text-red-500 hover:text-red-700">
                                                        <Trash2 size={18} className="inline" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {formVisible && (
                            <form onSubmit={handleAddMetric} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-lg font-semibold">Tambah Metrik Baru</h3>
                                <div className="flex flex-col gap-4 md:flex-row">
                                    <div className="flex-1">
                                        <label className="text-sm font-medium text-gray-700">Judul (e.g. Pohon Ditanam)</label>
                                        <input
                                            type="text" required value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
                                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-[#61B58E]"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-sm font-medium text-gray-700">Nilai Target (e.g. 150k+)</label>
                                        <input
                                            type="text" required value={newValue} onChange={(e) => setNewValue(e.target.value)}
                                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-[#61B58E]"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end gap-3">
                                    <button type="button" onClick={() => setFormVisible(false)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
                                        Batal
                                    </button>
                                    <button type="submit" className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow hover:bg-gray-800">
                                        Simpan Metrik
                                    </button>
                                </div>
                            </form>
                        )}
                    </>
                )}

                {/* PROGRAMS TAB */}
                {activeTab === "program" && (
                    <>
                        <header className="mb-8 flex items-center justify-between">
                            <h1 className="text-3xl font-bold text-gray-800">Manajemen Program Utama</h1>
                            <button
                                onClick={() => setProgFormVisible(!progFormVisible)}
                                className="flex items-center gap-2 rounded-lg bg-[#61B58E] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#357427]"
                            >
                                <PlusCircle size={18} /> Tambah Program
                            </button>
                        </header>

                        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden mb-8">
                            <table className="w-full text-left text-sm text-gray-600">
                                <thead className="bg-[#f8fcfb] text-xs uppercase text-gray-700">
                                    <tr>
                                        <th className="px-6 py-4">Title</th>
                                        <th className="px-6 py-4">Description</th>
                                        <th className="px-6 py-4 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loadingPrograms ? (
                                        <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500">Memuat Data...</td></tr>
                                    ) : programs.length === 0 ? (
                                        <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500">Belum ada program.</td></tr>
                                    ) : (
                                        programs.map((item) => (
                                            <tr key={item.id} className="border-b border-gray-100 bg-white hover:bg-gray-50">
                                                <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
                                                <td className="px-6 py-4 text-gray-500 truncate max-w-xs">{item.description}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <button onClick={() => handleDeleteProgram(item.id)} className="text-red-500 hover:text-red-700">
                                                        <Trash2 size={18} className="inline" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {progFormVisible && (
                            <form onSubmit={handleAddProgram} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-lg font-semibold">Tambah Program Baru</h3>
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Judul Program</label>
                                        <input
                                            type="text" required value={progTitle} onChange={(e) => setProgTitle(e.target.value)}
                                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-[#61B58E]"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Deskripsi Singkat</label>
                                        <textarea
                                            required value={progDesc} onChange={(e) => setProgDesc(e.target.value)} rows={3}
                                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-[#61B58E]"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end gap-3">
                                    <button type="button" onClick={() => setProgFormVisible(false)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
                                        Batal
                                    </button>
                                    <button type="submit" className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow hover:bg-gray-800">
                                        Simpan Program
                                    </button>
                                </div>
                            </form>
                        )}
                    </>
                )}

                {/* PRODUCTS TAB */}
                {activeTab === "product" && (
                    <>
                        <header className="mb-8 flex items-center justify-between">
                            <h1 className="text-3xl font-bold text-gray-800">Manajemen Produk Turunan</h1>
                            <button
                                onClick={() => setProdFormVisible(!prodFormVisible)}
                                className="flex items-center gap-2 rounded-lg bg-[#61B58E] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#357427]"
                            >
                                <PlusCircle size={18} /> Tambah Produk
                            </button>
                        </header>

                        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden mb-8">
                            <table className="w-full text-left text-sm text-gray-600">
                                <thead className="bg-[#f8fcfb] text-xs uppercase text-gray-700">
                                    <tr>
                                        <th className="px-6 py-4">Nama Produk</th>
                                        <th className="px-6 py-4">Kategori</th>
                                        <th className="px-6 py-4">Harga</th>
                                        <th className="px-6 py-4 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loadingProducts ? (
                                        <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">Memuat Data...</td></tr>
                                    ) : products.length === 0 ? (
                                        <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">Belum ada produk.</td></tr>
                                    ) : (
                                        products.map((item) => (
                                            <tr key={item.id} className="border-b border-gray-100 bg-white hover:bg-gray-50">
                                                <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                                                <td className="px-6 py-4 text-gray-700">{item.category}</td>
                                                <td className="px-6 py-4 text-[#61B58E] font-medium">Rp {item.price.toLocaleString('id-ID')}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <button onClick={() => handleDeleteProduct(item.id)} className="text-red-500 hover:text-red-700">
                                                        <Trash2 size={18} className="inline" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {prodFormVisible && (
                            <form onSubmit={handleAddProduct} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-lg font-semibold">Tambah Produk Baru</h3>
                                <div className="flex flex-col gap-4">
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="text-sm font-medium text-gray-700">Nama Produk</label>
                                            <input
                                                type="text" required value={prodName} onChange={(e) => setProdName(e.target.value)}
                                                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-[#61B58E]"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="text-sm font-medium text-gray-700">Kategori</label>
                                            <input
                                                type="text" required value={prodCat} onChange={(e) => setProdCat(e.target.value)} placeholder="e.g Food, Crafts"
                                                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-[#61B58E]"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Harga (Rp)</label>
                                        <input
                                            type="number" required value={prodPrice} onChange={(e) => setProdPrice(e.target.value)}
                                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-[#61B58E]"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Deskripsi Singkat</label>
                                        <textarea
                                            required value={prodDesc} onChange={(e) => setProdDesc(e.target.value)} rows={2}
                                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-[#61B58E]"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end gap-3">
                                    <button type="button" onClick={() => setProdFormVisible(false)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
                                        Batal
                                    </button>
                                    <button type="submit" className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow hover:bg-gray-800">
                                        Simpan Produk
                                    </button>
                                </div>
                            </form>
                        )}
                    </>
                )}

                {/* COLLABORATE TAB */}
                {activeTab === "collab" && (
                    <>
                        <header className="mb-8 flex items-center justify-between">
                            <h1 className="text-3xl font-bold text-gray-800">Inbox Kemitraan</h1>
                            <span className="flex items-center gap-2 rounded-lg bg-[#E0F3EA] px-4 py-2 text-sm font-semibold text-[#357427]">
                                <BriefcaseBusiness size={18} /> {collabs.length} Pengajuan
                            </span>
                        </header>

                        <div className="grid grid-cols-1 gap-6">
                            {loadingCollabs ? (
                                <div className="p-8 text-center text-gray-500">Memuat Inbox...</div>
                            ) : collabs.length === 0 ? (
                                <div className="rounded-xl border border-dashed border-gray-300 p-12 text-center text-gray-500">
                                    Mata air masih sunyi. Belum ada pengajuan kolaborasi yang masuk.
                                </div>
                            ) : (
                                collabs.map((collab) => (
                                    <div key={collab.id} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900">{collab.companyName}</h3>
                                                <a href={`mailto:${collab.email}`} className="text-sm font-medium text-[#61B58E] hover:underline">
                                                    {collab.email}
                                                </a>
                                            </div>
                                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 border border-blue-200">
                                                {collab.focusArea}
                                            </span>
                                        </div>
                                        <div className="rounded-lg bg-gray-50 p-4 mb-4">
                                            <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                                                "{collab.message}"
                                            </p>
                                        </div>
                                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-4 mt-2 gap-4">
                                            <div className="flex flex-col gap-1">
                                                <span>Tanggal Masuk: {new Date(collab.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                                <div className="flex items-center gap-2">
                                                    Status Email: {collab.isEmailSent ? <span className="text-green-600 font-bold">✓ Terkirim</span> : <span className="text-yellow-600 font-bold">Tertunda</span>}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <select
                                                    value={collab.status}
                                                    onChange={(e) => handleUpdateCollabStatus(collab.id, e.target.value)}
                                                    className={`border rounded-md px-2 py-1.5 text-xs font-bold outline-none cursor-pointer ${collab.status === 'PENDING' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                                            collab.status === 'REVIEWED' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                                collab.status === 'CONTACTED' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                                                    'bg-green-50 text-green-700 border-green-200'
                                                        }`}
                                                >
                                                    <option value="PENDING">PENDING</option>
                                                    <option value="REVIEWED">REVIEWED</option>
                                                    <option value="CONTACTED">CONTACTED</option>
                                                    <option value="PARTNER">PARTNER</option>
                                                </select>
                                                <button onClick={() => handleDeleteCollab(collab.id)} title="Hapus Pengajuan" className="flex items-center justify-center p-1.5 text-red-500 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-md transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
