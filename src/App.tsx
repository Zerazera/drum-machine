import styled from "@emotion/styled"
import DrumMachine from "./components/DrumMachine"

const Body = styled.div`
  width: 100vw;
  height: 100vh;

`
const Main = styled.main`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (height < 500px) {
    height: 80%;
  }
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
