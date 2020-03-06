import { ReactNode } from "react";

export interface User {
  username: string
  name: string
  userImageUrl?: string
  jwt?: string
}

export interface NavBarProps {
  children: ReactNode
}

export interface UserProps extends User {

}