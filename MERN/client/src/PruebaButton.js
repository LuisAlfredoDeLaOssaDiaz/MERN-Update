import { Button } from "antd"
import { Link } from 'react-router-dom'

export default function PruebaButton({ruta}) {
    return (
        <>
            <Link to={`/${ruta}`}>
                <Button type='primary'>
                    GO TO /{ruta}
                </Button>
            </Link>
        </>
    )
}