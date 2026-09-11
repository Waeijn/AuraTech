<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;

class DashboardController extends Controller
{
    public function stats(Request $request): JsonResponse
    {
        // Calculate Total Sales (excluding cancelled)
        $totalSales = Order::where('status', '!=', 'cancelled')->sum('total_amount');

        // Calculate New/Pending Orders
        $newOrders = Order::where('status', 'pending')->count();

        // Calculate Total Users
        $pendingUsers = User::count();

        // Calculate Products with critical stock (<= 5)
        $criticalStock = Product::where('stock', '<=', 5)->count();

        // Get the 5 most recent orders
        $recentOrders = Order::with('user')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'totalSales' => (float) $totalSales,
                'newOrders' => $newOrders,
                'pendingUsers' => $pendingUsers,
                'criticalStock' => $criticalStock,
                'recentActivity' => $recentOrders
            ]
        ]);
    }
}
