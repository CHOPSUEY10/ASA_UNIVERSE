<script lang="ts">
    import { authClient } from '$lib/auth-client';
    import { goto } from '$app/navigation';
     import { resolve } from '$app/paths';

    // 1. Svelte 5 Runes: Gunakan $state() untuk variabel reaktif
    let email = $state('');
    let password = $state('');
    let errorMessage = $state('');
    let isLoading = $state(false);

    // 2. Tangkap event untuk melakukan preventDefault secara manual
    const handleEmailLogin = async (event: Event) => {
        event.preventDefault(); 
        
        isLoading = true;
        errorMessage = '';

        const { data, error } = await authClient.signIn.email({
            email,
            password,
        });

        isLoading = false;

        if (error) {
            errorMessage = error.message || 'Gagal login, periksa kembali akun Anda.';
        } else if (data) {
            // 3. Tambahkan await pada goto untuk mengatasi peringatan ESLint
            await goto(resolve('/admin/dashboard'),{}); 
        }
    };

    const handleGitHubLogin = async () => {
        await authClient.signIn.social({
            provider: 'github',
            callbackURL: '/admin/dashboard' 
        });
    };
</script>

<div class="login-container" style="max-width: 400px; margin: 50px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
    <h2>Form Masuk Sistem</h2>
    
    {#if errorMessage}
        <p style="color: red; font-weight: bold;">{errorMessage}</p>
    {/if}

    <form onsubmit={handleEmailLogin}>
        <div style="margin-bottom: 15px;">
            <label for="email" style="display: block; margin-bottom: 5px;">Email:</label>
            <input type="email" id="email" bind:value={email} required style="width: 100%; padding: 8px; box-sizing: border-box;" />
        </div>

        <div style="margin-bottom: 15px;">
            <label for="password" style="display: block; margin-bottom: 5px;">Password:</label>
            <input type="password" id="password" bind:value={password} required style="width: 100%; padding: 8px; box-sizing: border-box;" />
        </div>

        <button type="submit" disabled={isLoading} style="width: 100%; padding: 10px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
            {isLoading ? 'Memproses...' : 'Masuk'}
        </button>
    </form>

    <div style="margin-top: 20px; text-align: center;">
        <p style="color: #666;">Atau masuk dengan metode alternatif:</p>
        <button onclick={handleGitHubLogin} style="width: 100%; padding: 10px; background-color: #24292e; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Masuk dengan GitHub
        </button>
    </div>
</div>