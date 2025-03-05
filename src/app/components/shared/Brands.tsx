import bitcoin from '../../../../public/logos/bitcoin.png';
import master from '../../../../public/logos/master.png';
import payoneer from '../../../../public/logos/payoneer.png';
import paypl from '../../../../public/logos/paypal.png';
import sbi from '../../../../public/logos/sbi.png';
import BrandSlider from './BrandSlider';

const Brands = () => {
  const brand = [
    { src: bitcoin, alt: 'Bitcoin logo' },
    { src: payoneer, alt: 'Payoneer logo' },
    { src: master, alt: 'Master card logo' },
    { src: paypl, alt: 'Master card logo' },
    { src: sbi, alt: 'SBI logo' },
  ];
  return (
    <section className="mb-30">
      <BrandSlider data={brand} />
    </section>
  );
};

export default Brands;
