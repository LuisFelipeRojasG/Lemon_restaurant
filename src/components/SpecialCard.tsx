import type { JSX } from "react"

export const SpecialCard = (props: { key: string; image: string; name: string; message: string }): JSX.Element => {
    return (
        <article className="w-82.5 h-120 rounded-2xl shadow-lg mb-16 flex flex-col border border-greenlim">
            <img className="object-cover rounded-t-2xl" src={props.image} alt={props.name} />
            <div className="p-5 flex flex-col gap-4">
                <h3 className="text-blacklim font-Markazy font-medium text-2xl">{props.name}</h3>
                <p className="w-auto mb-10 text-blacklim font-Karla text-lg">{props.message}</p>
            </div>
        </article>
    );
}