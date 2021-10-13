import styled from "styled-components/macro";


export const NavBar = styled.div`
    display: flex;
    align-items: center;
    min-width: 100%;
    height: 65px;
    background-color: ${(props) => props.backgroundColor};
    color: #eeeeee;
`;
export const Logo = styled.img`
    height: 40px;
`;
export const Input = styled.input`
    width: 23%;
    border-radius: 10px;
    border: none;
    outline: none;
    padding: 7px 15px;
    text-align: center;
    transition: all .35s ease-in-out;
    &:hover, &:focus {
        width: 30%;
        transition: all .35s ease-in-out;
    }
`;
export const BoxAbout = styled.div`
    display: flex;
`;
export const ItemAbout = styled.a`
    display: flex;
    align-items: center;
    margin: 0 15px;
`;