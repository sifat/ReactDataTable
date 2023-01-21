import renderer from 'react-test-renderer';
import { BootStrapSpinnerBorder, BootStrapSpinners, Loading } from '../ReactDataTable/Components/Elements';

it('BootStrapSpinners test', () => {
    const spinner = renderer.create(
        <BootStrapSpinners className="spinner-border" color="text-primary" size="small" />
    );
    let tree = spinner.toJSON();
    expect(tree).toMatchSnapshot();
});

it('BootStrapSpinnerBorder test', () => {
    const spinner = renderer.create(
        <BootStrapSpinnerBorder color="text-primary" margin="m-5" />
    );
    let tree = spinner.toJSON();
    expect(tree).toMatchSnapshot();
});

it('Default LoaderTest', () => {
    const loader = renderer.create(
        <Loading numColumn={2} />
    );
    let tree = loader.toJSON();
    expect(tree).toMatchSnapshot();
});