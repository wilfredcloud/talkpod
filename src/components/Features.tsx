import { features } from '../utils/data'
import FeatureItem from './FeatureItem'


const Features = () => {

    return (
        <div id='features' className="features">
            <h2>Features</h2>
            <div className="row">
                {features.map((item) => <FeatureItem key={item.name} {...item} />)}
            </div>
        </div>
    )
}

export default Features
