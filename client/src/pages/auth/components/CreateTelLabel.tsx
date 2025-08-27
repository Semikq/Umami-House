import React, {useState} from "react";

export default function CreateTelLabel({setUserInput}){
    const [tel, setTel] = useState("+380")

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let digits = e.target.value.replace(/\D/g, "")
        if (!digits.startsWith("380")) digits = "380";

        let formatted = "+" + digits.slice(0, 3)
        if (digits.length > 3) formatted = "+" + digits.slice(0, 3) + " " + digits.slice(3)
        if (digits.length > 5) formatted = "+" + digits.slice(0, 3) + " " + digits.slice(3, 5) + " " + digits.slice(5)
        if (digits.length > 8) formatted = "+" + digits.slice(0, 3) + " " + digits.slice(3, 5) + " " + digits.slice(5, 8) + " " + digits.slice(8)
        if (digits.length > 10) formatted = "+" + digits.slice(0, 3) + " " + digits.slice(3, 5) + " " + digits.slice(5, 8) + " " + digits.slice(8, 10) + " " + digits.slice(10, 12)

        setTel(formatted);
        setUserInput(formatted)
    }

    return (
        <label htmlFor="tel">
            <p>Номер телефону<span title="Обов'язкове поле">*</span></p>
            <input id="tel" type="tel" value={tel} onInput={handleInput} required/>
        </label>
    )
}