import perfil01 from '../assets/images/perfil01.webp'
import perfil02 from '../assets/images/perfil02.webp'
import perfil03 from '../assets/images/perfil03.webp'
import perfil04 from '../assets/images/perfil04.webp'

interface dataTestimonial {
  image: string
  name: string
  message: string
}

export const dataTestimonial: dataTestimonial[] = [
  {
    image: perfil01,
    name: 'Paul Wilson',
    message: 'The food was absolutely wonderful, from preparation to presentation, very pleasing.'
  },
  {
    image: perfil02,
    name: 'Jane Smith',
    message: 'The atmosphere is charming and the staff is incredibly attentive.'
  },
  {
    image: perfil03,
    name: 'Emily Johnson',
    message: 'A delightful experience with a perfect blend of flavors and textures.'
  },
  {
    image: perfil04,
    name: 'Paul Brown',
    message: 'I highly recommend this restaurant for anyone looking for a memorable dining experience.'
  }
]