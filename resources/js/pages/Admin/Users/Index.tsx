import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface Props {
    users: User[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Users', href: '/admin/users' },
];

// Helper untuk styling badge role
const roleBadgeStyles = (role: string) => {
    switch (role.toLowerCase()) {
        case 'admin':
            return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
        case 'user':
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
        default:
            return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200';
    }
};

export default function UsersIndex({ users }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar User" />

            <div className="flex flex-col gap-6 p-4 md:p-6">
                {/* Header Section */}
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Manajemen User
                        </h1>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                            Kelola semua akun user di sistem Anda.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Search Input dengan Ikon */}
                        <div className="relative">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                />
                            </svg>
                            <input
                                type="text"
                                placeholder="Cari user..."
                                className="h-9 w-full rounded-md border border-neutral-300 bg-white dark:bg-neutral-900 pl-9 pr-3 text-sm placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-neutral-700 dark:focus:ring-blue-500 dark:focus:ring-offset-neutral-900 md:w-64"
                            />
                        </div>

                        {/* Tombol Tambah User dengan Ikon */}
                        <Link
                            href="/admin/users/create"
                            className="inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-blue-600 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                />
                            </svg>
                            <span>Tambah User</span>
                        </Link>
                    </div>
                </div>

                {/* Table Section */}
                <div className="relative w-full overflow-hidden rounded-lg border border-sidebar-border/70 dark:border-sidebar-border">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-max text-sm">
                            {/* Header Tabel Modern (tanpa background) */}
                            <thead className="border-b border-neutral-200 dark:border-neutral-700">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                        ID
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                        Nama
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                        Email
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                        Role
                                    </th>
                                    <th className="relative px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-sidebar-border/50 dark:divide-neutral-700">
                                {users.length > 0 ? (
                                    users.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="hover:bg-neutral-50 dark:hover:bg-neutral-900/40 transition-colors"
                                        >
                                            <td className="px-4 py-4 text-neutral-600 dark:text-neutral-400">
                                                {user.id}
                                            </td>
                                            <td className="px-4 py-4 font-medium text-neutral-900 dark:text-neutral-100">
                                                {user.name}
                                            </td>
                                            <td className="px-4 py-4 text-neutral-600 dark:text-neutral-400">
                                                {user.email}
                                            </td>
                                            <td className="px-4 py-4">
                                                {/* Badge untuk Role */}
                                                <span
                                                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${roleBadgeStyles(
                                                        user.role,
                                                    )}`}
                                                >
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-right space-x-4">
                                                {/* Aksi: Edit & Delete */}
                                                <Link
                                                    href={`/admin/users/${user.id}/edit`}
                                                    className="font-medium text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    href={`/admin/users/${user.id}`}
                                                    method="delete"
                                                    as="button"
                                                    onBefore={() =>
                                                        confirm(
                                                            'Anda yakin ingin menghapus user ini?',
                                                        )
                                                    }
                                                    className="font-medium text-red-600 transition-colors hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                                >
                                                    Delete
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    // Tampilan Empty State yang lebih baik
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="p-6 text-center text-neutral-500 dark:text-neutral-400"
                                        >
                                            <div className="flex flex-col items-center justify-center gap-4 py-12">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="size-16 text-neutral-400 dark:text-neutral-600"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.003c0 1.113.285 2.16.786 3.07M15 19.128c.501.91.786 1.957.786 3.07M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.069.16 2.18.188 3.242.025a9.345 9.345 0 0 0 2.625-.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M3.375 12c0-1.6 1.123-2.994 2.707-3.227 1.069-.16 2.18-.188 3.242.025a9.345 9.345 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121.952 4.125 4.125 0 0 0 7.533 2.493m-16.5-3.01c.501.91.786 1.957.786 3.07"
                                                    />
                                                </svg>
                                                <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                                                    Belum Ada User
                                                </h3>
                                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                                    Mulai dengan menambahkan
                                                    user baru.
                                                </p>
                                                <Link
                                                    href="/admin/users/create"
                                                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="size-4"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M12 4.5v15m7.5-7.5h-15"
                                                        />
                                                    </svg>
                                                    Tambah User Baru
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <PlaceholderPattern className="pointer-events-none absolute inset-0 size-full stroke-neutral-900/5 dark:stroke-neutral-100/5" />
                </div>
            </div>
        </AppLayout>
    );
}
