<script>
  export let data;
  let user = data;
  import User from '../../../components/User.svelte'
  import UserForm from '../../../components/UserForm.svelte'
  import ProfileMenu from '../../../components/ProfileMenu.svelte'
</script>

<main >

<ProfileMenu />

<User user={user} />

{#if user.profile_setup == false}
  <UserForm user={user} edit={false} />
{/if}

</main>