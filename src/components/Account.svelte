<script>
    import { supabase } from '../supabase.js'

    let loading = false
    let email 

    const handleLogin = async () => {
        try {
            loading = true
            const { error } = await supabase.auth.signInWithOtp({ email })
            if (error) throw error
            alert('Check your email for the login link!')
        } catch (error) {
            alert("error: " + error.message || error.error_description)
        } finally {
            loading = false
        }
    }
</script>

<h1 class="text-2xl font-bold text-center text-gray-800 md:text-3xl">Log In</h1>

<p class="text-center mt-2"> Sign in via magic link with your email below</p>

<form on:submit|preventDefault={handleLogin}>
    <div class="flex flex-col text-sm mb-2">
        <label class="font-bold mb-2 text-gray-800" for="email">Email</label>
        <input class="appearance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg" name="email" type="email" placeholder="email@address.com" bind:value={email} >
    </div>
    <button class="w-full shadow-sm rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4" type="submit">Log In</button>
</form>