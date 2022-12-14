import { writable } from 'svelte/store';
import { supabase } from '../supabase.js';

export const character = writable({});
export const characters = writable([]);
export const playableCharacters = writable([]);

export const loadCharacter = async (/** @type {any} */ id) => {
    const { data, error } = await supabase.from('characters').select().match({ id }).then(res => {
        character.set(res.data[0]);
    });

    if (error) {
        return console.error(error);
    }

    return data;
};

export const loadCharacters = async () => {
    const { data, error } = await supabase.from('characters').select( '*' );

    if (error) {
        return console.error(error);
    }
    characters.set(data);
}

export const loadPlayableCharacters = async (id) => {
    // get characters matching the user_id of the current user
    const { data, error } = await supabase.from('characters').select( '*' ).match({ user_id: id}).then (res => {
        playableCharacters.set(res.data);
    });

    if (error) {
        return console.error(error);
    }

}
export const addCharacter = async (/** @type {any} */ character) => {
    console.log(character)
    const { data, error } = await supabase
        .from('characters')
        .insert([{ ...character }])
        .select();

    if (error) {
        return console.error(error);
    }

    // get the character_id from the response
    const id = data[0].id;

    // route browser to /character/[character_id]
    window.location.href = `/character/${id}`;
}

export const updateCharacter = async (/** @type {any} */ character) => {
	const { data, error } = await supabase
		.from('characters')
		.update([{ ...character }])
		.match({ user_id: character.user_id });

	if (error) {
		return console.error(error);
	}
    loadCharacters();
};


export const deleteCharacter = async (/** @type {any} */ character) => {
    let id = character.id;
    const { error } = await supabase.from('characters').delete().match({ id });

    if (error) {
        return console.error(error);
    }

    characters.update((characters) => characters.filter((character) => character.id !== id));

    // route to profile at /users/[user_id]

    window.location.href = `/user/${character.user_id}`;
}


loadCharacters();