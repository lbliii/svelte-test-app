<script>
    export let user;
    import {Avatar, Badge, Button, Card, Heading, Hr, Modal, P} from 'flowbite-svelte'
    import {account} from '../stores/accountStore.js';
    import Character from '../components/Character.svelte';
    import UserForm from '../components/UserForm.svelte';
    import {characters} from '../stores/characterStore.js';

    let editProfile = false;
    let id = $account.id
    function checkIfOwner() {

        if (user.user_id === id) {
            return true;
        }
        else {
            return false;
        }
    }
</script>


<div class="my-2">
     <Card size="lg" padding="sm">
        <div class="flex flex-row justify-end  my-2"> 
            {#if user.age}
            <Badge color="pink">{user.age} </Badge>
            {/if}
            {#if user.time_zone}
            <Badge color="dark">{user.time_zone} </Badge>
            {/if}
        </div>
        <Heading tag="h1" class="mb-4"> {user.alias} </Heading>

        {#if user.likes}
            <Heading tag="h2" class="mb-2"> Likes</Heading>
            <P class="my-2">{@html user.likes}</P>
        {/if}
        {#if user.dislikes}
            <Heading tag="h2" class="mb-2"> Dislikes</Heading>
            <P class="my-2">{@html user.dislikes}</P>
        {/if}

        {#if checkIfOwner()}
        <div class="flex justify-end my-2">
            <Button size="xs" color="light" class="mr-2" on:click={() => editProfile = true}>Edit</Button>
        </div>
        {/if}
        <Hr class="my-8" width="w-64" height="h-1" icon>
            <svg
            aria-hidden="true"
            class="w-5 h-5 text-gray-700 dark:text-gray-300"
            viewBox="0 0 24 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            ><path
                d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                fill="currentColor" /></svg>
        </Hr>
        {#each $characters as character}
            {#if character.user_id === user.user_id}
                <Character character={character} profile={user} />
            {/if}
        {/each}
    </Card>
</div>

<Modal bind:open={editProfile} size="xs" autoclose={false}>
    <UserForm profile="{user}" edit={true}/>
</Modal>