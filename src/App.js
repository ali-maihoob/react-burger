import Layout from '../src/components/Layout/Layout'
import BurgerIngredients from "./components/Burger/BurgerIngredients/BurgerIngredients";
function App() {
  return (
    <div>
      <Layout>
        <BurgerIngredients type='bread-top' />
      </Layout>
    </div>
  );
}

export default App;
