import greekSalad from '../assets/images/greek_salad.webp'
import bruschetta from '../assets/images/bruschetta.webp'
import lemondessert from '../assets/images/lemon_dessert.webp'

interface SpecialCard {
    image: string;
    name: string;
    message: string;
}

const specialCards: SpecialCard[] = [
    {
        image: greekSalad,
        name: 'Greek Salad',
        message: 'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.'
    },
    {
        image: bruschetta,
        name: 'Bruschetta',
        message: 'Our Bruschetta is made from homemade grilled bread that has been smeared with garlic and seasoned with salt and olive oil.'
    },
    {
        image: lemondessert,
        name: 'Lemon Dessert',
        message: 'This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.'
    }
];

export { specialCards };


