<script>
    import {Badge, Button, Card, Heading, Modal, P} from 'flowbite-svelte'
    import {deleteThread, updateThread} from '../stores/threadStore.js';
    import ThreadForm from '../components/ThreadForm.svelte';
    import {profile} from '../stores/profileStore.js';
    import {account} from '../stores/accountStore.js';

    export let thread;
    export let edit; 

    let deleteModal = false;
    let editModal = false;

    function checkIfOwner() {
        let id = $account.id
        if ($profile.user_id === id) {
            return true;
        }
        else {
            return false;
        }

    }

</script>

<div class="my-6">
     <Card size="lg" padding="sm" href="/thread/{thread.id}">
        <Heading tag="h2" class="mb-2"> {thread.title}</Heading>
        <P class="my-2">{@html thread.description}</P>
    
    </Card>
    {#if checkIfOwner()}
        <div class="flex justify-end my-2">
            <Button size="xs" color="light" on:click={() => editModal = true}>Edit</Button>
            <Button size="xs" color="red" on:click={() => deleteModal = true}>Delete</Button>
        </div>
        {/if}
</div>

<Modal bind:open={editModal} size="xs" autoclose={false}>
    <ThreadForm thread="{thread}" edit={true}/>
</Modal>

<Modal bind:open={deleteModal} size="xs" autoclose>
  <div class="text-center">
      <svg aria-hidden="true" class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this topic?</h3>
      <Button color="red" class="mr-2" on:click={() => deleteThread(thread)}>Yes, I'm sure</Button>
      <Button color='alternative'>No, cancel</Button>
  </div>
</Modal>




