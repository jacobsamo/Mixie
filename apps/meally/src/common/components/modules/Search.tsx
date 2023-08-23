'use client';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@components/ui/command';

import React from 'react';
import { useFetchAllRecipe } from '../../lib/services/RecipeService';

interface SearchProps {
  externalOpen?: boolean;
  setExternalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Search({ externalOpen, setExternalOpen }: SearchProps) {
  const [open, setOpen] = React.useState(false);
  const { recipes } = useFetchAllRecipe();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setExternalOpen !== undefined
          ? setExternalOpen((open) => !open)
          : setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <CommandDialog
      open={externalOpen !== undefined ? externalOpen : open}
      onOpenChange={setExternalOpen !== undefined ? setExternalOpen : setOpen}
    >
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Top Recipes">
          {/*TODO: make this with live data reloading daily */}
          <CommandItem>brownies</CommandItem>
          <CommandItem>rice</CommandItem>
          <CommandItem>test</CommandItem>
        </CommandGroup>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export default Search;


// import React from 'react';
// import {
//   Command,
//   CommandDialog,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
//   CommandSeparator,
//   CommandShortcut,
// } from '@components/ui/command';
// import { useFetchAllRecipe } from '../../lib/services/RecipeService';

// interface SearchProps {
//   externalOpen?: boolean;
//   setExternalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
// }

// export function Search({ externalOpen, setExternalOpen }: SearchProps) {
//   const [open, setOpen] = React.useState(false);
//   const [query, setQuery] = React.useState('');
//   const { recipes } = useFetchAllRecipe();

//   const filteredRecipes = recipes.filter((recipe) =>
//     recipe.name.toLowerCase().includes(query.toLowerCase())
//   );

//   React.useEffect(() => {
//     const down = (e: KeyboardEvent) => {
//       if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
//         e.preventDefault();
//         setExternalOpen !== undefined
//           ? setExternalOpen((open) => !open)
//           : setOpen((open) => !open);
//       }
//     };
//     document.addEventListener('keydown', down);
//     return () => document.removeEventListener('keydown', down);
//   }, []);

//   return (
//     <CommandDialog
//       open={externalOpen !== undefined ? externalOpen : open}
//       onOpenChange={setExternalOpen !== undefined ? setExternalOpen : setOpen}
//     >
//       <CommandInput
//         placeholder="Type a command or search..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />
//       <CommandList>
//         {filteredRecipes.length === 0 ? (
//           <CommandEmpty>No results found.</CommandEmpty>
//         ) : (
//           <CommandGroup heading="Search Results">
//             {filteredRecipes.slice(0, 5).map((recipe) => (
//               <CommandItem key={recipe.id}>{recipe.name}</CommandItem>
//             ))}
//           </CommandGroup>
//         )}
//         <CommandSeparator />
//         <CommandGroup heading="Top Recipes">
//           {/*TODO: make this with live data reloading daily */}
//           {recipes.slice(0, 5).map((recipe) => (
//             <CommandItem key={recipe.id}>{recipe.name}</CommandItem>
//           ))}
//         </CommandGroup>
//         <CommandGroup heading="Suggestions">
//           <CommandItem>Calendar</CommandItem>
//           <CommandItem>Search Emoji</CommandItem>
//           <CommandItem>Calculator</CommandItem>
//         </CommandGroup>
//       </CommandList>
//     </CommandDialog>
//   );
// }