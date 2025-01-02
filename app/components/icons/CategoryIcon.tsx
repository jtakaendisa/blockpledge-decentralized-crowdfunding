import Art from './Art';
import Categories from './Categories';
import Community from './Community';
import Crafts from './Crafts';
import Education from './Education';
import Fashion from './Fashion';
import Finance from './Finance';
import Food from './Food';
import Gaming from './Gaming';
import Health from './Health';
import Pets from './Pets';
import Tech from './Tech';
import Travel from './Travel';

interface Props {
  id?: number;
}

const CategoryIcon = ({ id }: Props) => {
  switch (id) {
    case 0:
      return <Art />;
    case 1:
      return <Tech />;
    case 2:
      return <Community />;
    case 3:
      return <Fashion />;
    case 4:
      return <Food />;
    case 5:
      return <Gaming />;
    case 6:
      return <Travel />;
    case 7:
      return <Education />;
    case 8:
      return <Health />;
    case 9:
      return <Crafts />;
    case 10:
      return <Finance />;
    case 11:
      return <Pets />;
    default:
      return <Categories />;
  }
};

export default CategoryIcon;
