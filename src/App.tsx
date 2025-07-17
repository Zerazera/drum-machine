import styled from "@emotion/styled"
import DrumMachine from "./components/DrumMachine"

const Body = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`
const Main = styled.main`
  width: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;

  @media screen and (height < 500px) {
    margin-top: 0.3px;
  }

  @media screen and (height < 344px) {
    margin-top: 0;
  }
`

export default function App() {
  return (
    <Body>
      <header>
        <Title>Drum Machine</Title>
      </header>
      <Main>
        <DrumMachine />
      </Main>
    </Body>
  )
}
