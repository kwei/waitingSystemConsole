import {LoginForm} from "@/app/login/LoginForm";

export default function Home() {
    return (
        <div className="flex w-full h-full items-center gap-4 p-2 md:p-4">
            <LoginForm />
        </div>
    )
}
