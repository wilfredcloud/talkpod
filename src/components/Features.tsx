import FeatureItem from './FeatureItem'

const Features = () => {
  return (
    <div className="features">
    <h2>Some Unique Features</h2>
    <div className="row">
    {[1, 2, 3].map((item) => <FeatureItem key={item}/>)}
    </div>
    </div>    
  )
}

export default Features
