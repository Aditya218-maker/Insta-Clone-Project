import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";

//useAuth is our custom Hook

/*

Custom Hooks in React are reusable JavaScript functions that allow developers to extract and share stateful logic across multiple components.
They follow the same rules as built-in hooks (like useState, useEffect) and must start with the prefix use
Custom hooks help in separating concerns, improving code readability, and avoiding duplication of logic.

Think of a custom hook like a helper function for your React components.
If you’re writing the same logic again and again (like fetching data or handling input), you can move it into one function and reuse it.
*/

export function useAuth(){
    const context = useContext(AuthContext)
    // ab is conrext me wo chaaro values ajayengi: User, loading, handleLogin, handleRegister
    return context
}