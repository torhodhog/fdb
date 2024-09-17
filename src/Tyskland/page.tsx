import ProductReel from '@/components/ProductReel';

const TysklandProductsPage = () => {
  return (
    <div>
      <ProductReel
        title="Tyske Drakter"
        query={{ nation: 'tyskland' }}
      />
    </div>
  );
};

export default TysklandProductsPage;