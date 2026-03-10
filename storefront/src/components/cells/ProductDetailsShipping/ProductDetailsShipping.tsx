import { ProductPageAccordion } from '@/components/molecules';

export const ProductDetailsShipping = () => {
  return (
    <ProductPageAccordion
      heading='Información de Entrega'
      defaultOpen={true}
    >
      <div className='product-details'>
        <ul>
          <li>
            Realizamos entregas a todas las regiones con un costo 
            adicional. Las entregas en la Región Metropolitana 
            pueden tardar entre 2 a 5 días hábiles, mientras 
            que a regiones puede tomar hasta 10 días hábiles.
          </li>
          <li>
            Contamos con garantía de satisfacción. Si la moto presenta 
            algún problema de fábrica, puedes gestionar el cambio o 
            devolución siguiendo nuestros términos y condiciones.
          </li>
        </ul>
      </div>
    </ProductPageAccordion>
  );
};
