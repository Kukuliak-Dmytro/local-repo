import { useState, useCallback } from "react";
/**
 * useFormState - a custom hook for form state management.
 *
 * Usage:
 *   const [form, setForm, handleChange] = useFormState({ field1: '', field2: '' });
 *   <input id="field1" onChange={handleChange} />
 *   <input id="field2" onChange={handleChange} />
 *
 * The hook will update the correct field based on the input's id or name.
 */
export default function useFormState(initialState) {
  const [state, setState] = useState(initialState);

  const handleChange = useCallback((e) => {
    const key = e.target.id || e.target.name;
    if (!key) return;
    setState((prev) => ({ ...prev, [key]: e.target.value }));
  
  }, []);

  return [state, setState, handleChange];
}
