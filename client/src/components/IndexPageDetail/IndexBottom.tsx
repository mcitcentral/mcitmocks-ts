import IndexFeature from "./IndexFeature";

const IndexBottom: React.FC = ()=> {
    const introduction = 'This is a paragraph of introduction, This is a paragraph of introduction, This is a paragraph of introduction'
    return (
        <div className="bottom">
            <div className="bottom__header">How does it work?</div>
            <div className="bottom__columns">
                <div className="bottom__columns__col1">
                    <IndexFeature {...{logo:'interview',title:'title',introduction: introduction}}></IndexFeature>
                </div>
                <div className="bottom__columns__col2">
                    <IndexFeature {...{logo:'interview',title:'title',introduction: introduction}}></IndexFeature>
                </div>
                <div className="bottom__columns__col3">
                    <IndexFeature {...{logo:'interview',title:'title',introduction: introduction}}></IndexFeature>
                </div>    
            </div>
        </div>
    )
};

export default IndexBottom;