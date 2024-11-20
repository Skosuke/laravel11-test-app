<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Middleware\RedirectIfAuthenticated;
use Illuminate\Support\Facades\Log;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Viteのプリフェッチ設定
        Vite::prefetch(concurrency: 3);

        Log::info('RedirectIfAuthenticated triggered');

        // 認証済みユーザーのリダイレクト先を設定
        RedirectIfAuthenticated::redirectUsing(function () {
            return route('dashboard'); // リダイレクト先を指定
        });
    }
}
