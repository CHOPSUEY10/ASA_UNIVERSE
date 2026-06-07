<script lang="ts">
	import './layout.css';
	import ToastContainer from '$lib/components/ToastContainer.svelte';
	import { navigating } from '$app/stores';

	let { children } = $props();
</script>

<ToastContainer />

{#if $navigating}
	<div class="fixed inset-0 bg-[#0A0A0A]/95 z-[9999] flex flex-col items-center justify-center transition-all duration-300">
		<div class="relative w-32 h-32 flex items-center justify-center">
			<div class="absolute inset-0 bg-radial from-[#A00000]/30 to-transparent rounded-full blur-2xl animate-pulse"></div>
			<svg class="w-16 h-16 text-[#FFD700] animate-spin" style="animation-duration: 3s" viewBox="0 0 512 512" fill="currentColor">
				<path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 40c21.8 0 43 3.4 63 9.6l-21.7 66.8c-13-4.1-27.5-6.4-41.3-6.4s-28.3 2.3-41.3 6.4L193 49.6c20-6.2 41.2-9.6 63-9.6zm-89.6 24.8l20.4 62.8c-23.7 14.1-43.8 34.2-57.9 57.9l-62.8-20.4c21.2-41 59.3-79.1 100.3-100.3zM40 256c0-21.8 3.4-43 9.6-63l62.8 20.4c-4.1 13-6.4 27.5-6.4 42.6s2.3 29.6 6.4 42.6l-62.8 20.4c-6.2-20-9.6-41.2-9.6-63zm24.8 89.6l62.8-20.4c14.1 23.7 34.2 43.8 57.9 57.9l-20.4 62.8c-41-21.2-79.1-59.3-100.3-100.3zm124.5 116.8l21.7-66.8c13 4.1 27.5 6.4 41.3 6.4s28.3-2.3 41.3-6.4l21.7 66.8c-20 6.2-41.2 9.6-63 9.6s-43-3.4-63-9.6zm133.3-9.6l-20.4-62.8c23.7-14.1 43.8-34.2 57.9-57.9l62.8 20.4c-21.2 41-59.3 79.1-100.3 100.3zM472 256c0 21.8-3.4 43-9.6 63l-62.8-20.4c4.1-13 6.4-27.5 6.4-42.6s-2.3-29.6-6.4-42.6l62.8-20.4c6.2 20 9.6 41.2 9.6 63zm-24.8-89.6l-62.8 20.4c-14.1-23.7-34.2-43.8-57.9-57.9l20.4-62.8c41 21.2 79.1 59.3 100.3 100.3zm-104.9-74L320.6 160c-20-9.1-42.2-14-64.6-14s-44.6 4.9-64.6 14l-21.7-67.6c26.3-12.8 55.7-19.8 86.3-19.8s60 7 86.3 19.8zM256 186c38.7 0 70 31.3 70 70s-31.3 70-70 70-70-31.3-70-70 31.3-70 70-70zm-96 70c0-16.1 4-31.3 11-44.7l-64.7-21c-4.1 20.5-6.3 41.8-6.3 65.7s2.2 45.2 6.3 65.7l64.7-21c-7-13.4-11-28.6-11-44.7zm192 0c0 16.1-4 31.3-11 44.7l64.7 21c4.1-20.5 6.3-41.8 6.3-65.7s-2.2-45.2-6.3-65.7l-64.7 21c7 13.4 11 28.6 11 44.7zm-96 96c22.4 0 44.6-4.9 64.6-14l21.7 67.6c-26.3 12.8-55.7 19.8-86.3 19.8s-60-7-86.3-19.8l21.7-67.6c20 9.1 42.2 14 64.6 14z"/>
			</svg>
		</div>
		<p class="text-sm font-bold text-white mt-6 uppercase tracking-widest animate-pulse">Preparing Match Day Experience...</p>
	</div>
{/if}

{@render children()}
