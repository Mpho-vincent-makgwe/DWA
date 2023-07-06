
import viteLogo from '/vite.svg'

export default function Main() {
    return (
        <main>
            <a href="https://vitejs.dev" target="_blank" rel="noopener">
            <img src={viteLogo} className="logo" alt="Vite logo" />
            </a> 

            <h1 className='main--title'>Main goes Here</h1>
            <ul className='list'>
                <li className='list-items'><p>Was First Released in 2013</p></li>
                <li className='list-items'><p>Was originally created by Jordan Walke</p></li>
                <li className='list-items'><p>Has well over 100K stars on GitHub</p></li>
                <li className='list-items'><p>Powers thousands of enterpricse apps, including mobile apps.</p></li>
            </ul>
        </main>
    )
}

 