import React from 'react';
import styled from 'styled-components';
import { ELEMENTS } from '@titicaca/triple-document'



const { anchor: Anchor} = ELEMENTS

export default {
    title: 'TripleDocument | TripleDocument.Anchor'
}

export function BaseAnchor() {
    return (
        <Anchor/>
    )
}

BaseAnchor.story = {
    name: 'Anchor'
}