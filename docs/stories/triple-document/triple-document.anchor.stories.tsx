import React, {useEffect} from 'react';
import styled from 'styled-components';
import { ELEMENTS } from '@titicaca/triple-document'
import { useCanonicalHash} from '@titicaca/react-hooks'

 const Container= styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
 `

const Temp = styled.div`
    width: 100%;
    height: 200vh;
`
const Button = styled.button`
    width: 100px;
    height: 50px;
`

const { anchor: Anchor} = ELEMENTS

export default {
    title: 'TripleDocument | TripleDocument.Anchor'
}

export function BaseAnchor() {
    useEffect(() => {
        window.history.pushState(null, '', '#App')
    })

    const { canonicalHash } = useCanonicalHash({})

    return (
        <Container>
            <Temp/>
            <Anchor canonicalHash={canonicalHash} elementId={'App'} delayTime={0} />
            <div>
                App
            </div>
            <Temp/>
            <Anchor canonicalHash={canonicalHash} elementId={'DApp'} />
            <div>
                DApp
            </div>
           
            <Temp/>
        </Container>
        
    )
}

BaseAnchor.story = {
    name: 'Anchor'
}