"use client";

import style from "./bigButtonStyles.module.scss";
import { ButtonHTMLAttributes } from "react";
import { useRouter } from "next/navigation";

type ValueButtonType = {
    value: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const BigButton = (props: ValueButtonType) => {
    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        props.onClick?.(e); // Вызываем оригинальный обработчик, если он есть
        router.push("/"); // Переход на главную страницу
    };

    return (
        <button 
            type={props.type} 
            className={style.bigButton} 
            onClick={handleClick}
        >
            {props.value}
        </button>
    );
};

export default BigButton;