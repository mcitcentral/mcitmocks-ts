import "./IndexPageDetail.scss"
export interface IndexFeatureProps {
    logo: string,
    title: string,
    introduction: string
}
const IndexFeature: React.FC<IndexFeatureProps> = ({logo,title,introduction})=> {
    return (
        <div className="feature">
            <div className="feature__row1">logo</div>
            <p className="feature__row2">{title}</p>
            <div className="feature__row3">{introduction}</div>
        </div>
    )
}

export default IndexFeature;