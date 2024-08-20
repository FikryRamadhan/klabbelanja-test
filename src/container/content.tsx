import { Route, Routes } from "react-router-dom"
import routes from "../routes"
import React, { useRef } from "react"
import { Suspense } from "react"
import Page404 from '../pages/404'

const Content = () => {
    const mainContentRef = useRef(null);
    return (
        <>
            <div className="flex-grow p-5 md:p-5 lg:pt-5 lg:px-10" ref={mainContentRef}>
                <main>
                    <Suspense>
                        <Routes>
                            {
                                routes.map((route, key) => {
                                    return (
                                        <Route
                                            key={key}
                                            path={`${route.path}`}
                                            element={React.cloneElement(<route.component />)}
                                        />
                                    )
                                })
                            }
                            {/* Redirecting unknown url to 404 page */}
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </>
    )
}

export default Content