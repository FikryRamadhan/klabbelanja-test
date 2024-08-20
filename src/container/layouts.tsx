import Content from "./content"
import Header from "./header"

const Layouts = () => {
    return (
        <>
            <div className="min-h-screen flex flex-col bg-gray-100">
                {/* Header */}
                <Header />

                {/* Content */}
                <Content />
            </div>
        </>
    )
}

export default Layouts