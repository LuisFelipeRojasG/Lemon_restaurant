import type { JSX } from "react"

interface SpecialCardProps {
  image: string
  name: string
  message: string
}

export const SpecialCard = ({ image, name, message }: SpecialCardProps): JSX.Element => {
    return (
        <article className="w-82.5 h-120 rounded-2xl shadow-lg mb-16 flex flex-col border border-greenlim">
            <img className="w-full h-54 rounded-t-2xl" src={image} alt={name} />
            <div className="p-5 flex flex-col gap-4">
                <h3 className="text-blacklim font-Markazy font-medium text-2xl">{name}</h3>
                <p className="w-auto mb-10 text-blacklim font-Karla text-lg">{message}</p>
            </div>
        </article>
    );
}
