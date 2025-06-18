import { useState } from "react"

const useFormHandler = <T extends object>(initialState: T) => {
    const [form, setForm] = useState<T>(initialState);

    const handleFormChange = (field: keyof T, value: unknown) => { // unknown 사용 이유? 넘길 때 타입을 확실히 보장할 수 있다면 unknown + as T[keyof T] 형태 추천 
        setForm(prev => ({
            ...prev,
            [field]: value as T[keyof T]
        }));
    };

    return {form, setForm, handleFormChange}
}

export default useFormHandler;