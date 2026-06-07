<script lang="ts">
    import { numberFormatter } from '$lib/utils';

    let { stats = { total: 0, daily: 0, monthly: 0 } }: {
        stats?: {
            total: number;
            daily: number;
            monthly: number;
        }
    } = $props();
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <!-- Daily Visitors -->
    <div class="bg-[#111] border border-zinc-800 rounded-sm p-6 shadow-sm flex items-center space-x-4">
        <div class="p-3 bg-[#990000]/10 text-[#990000] rounded-lg">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
        </div>
        <div>
            <p class="text-sm font-medium text-zinc-400">Pengunjung Hari Ini</p>
            <p class="text-2xl font-bold text-white">{numberFormatter.format(stats.daily)}</p>
        </div>
    </div>

    <!-- Monthly Visitors -->
    <div class="bg-[#111] border border-zinc-800 rounded-sm p-6 shadow-sm flex items-center space-x-4">
        <div class="p-3 bg-[#990000]/10 text-white rounded-lg">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
        </div>
        <div>
            <p class="text-sm font-medium text-zinc-400">Pengunjung Bulan Ini</p>
            <p class="text-2xl font-bold text-white">{numberFormatter.format(stats.monthly)}</p>
        </div>
    </div>

    <!-- Total Visitors -->
    <div class="bg-[#111] border border-zinc-800 rounded-sm p-6 shadow-sm flex items-center space-x-4">
        <div class="p-3 bg-[#990000]/10 text-white rounded-lg">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
        </div>
        <div>
            <p class="text-sm font-medium text-zinc-400">Total Pengunjung</p>
            <p class="text-2xl font-bold text-white">{numberFormatter.format(stats.total)}</p>
        </div>
    </div>
</div>
