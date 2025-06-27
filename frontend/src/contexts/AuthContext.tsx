import { createContext } from 'react'
import { User } from 'firebase/auth'

export interface AuthContextType {
  user: User | null
  loading: boolean
  signup: (email: string, password: string, name: string, photoURL?: string) => Promise<any>
  login: (email: string, password: string) => Promise<any>
  googleSignIn: () => Promise<any>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export default AuthContext 