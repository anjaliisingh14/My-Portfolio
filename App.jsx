const { useState } = React;

function LoginProject() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            setMessage('Login successful! Welcome ' + (formData.username || formData.email));
        } else {
            setMessage('Registration successful! Account created for ' + formData.username);
        }
        setFormData({ username: '', email: '', password: '' });
    };

    return (
        <div className="project-container">
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                            required
                        />
                    </div>
                )}
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required
                    />
                </div>
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
                <button type="button" onClick={() => setIsLogin(!isLogin)}>
                    Switch to {isLogin ? 'Register' : 'Login'}
                </button>
            </form>
            {message && <div className="message success">{message}</div>}
        </div>
    );
}

function StopwatchProject() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    React.useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = Math.floor((time % 1000) / 10);
        return minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0') + ':' + milliseconds.toString().padStart(2, '0');
    };

    return (
        <div className="project-container">
            <h2>Stopwatch</h2>
            <div className="stopwatch-display">{formatTime(time)}</div>
            <div className="counter-buttons">
                <button onClick={() => setIsRunning(!isRunning)}>
                    {isRunning ? 'Pause' : 'Start'}
                </button>
                <button onClick={() => { setTime(0); setIsRunning(false); }}>
                    Reset
                </button>
            </div>
        </div>
    );
}

function CounterProject() {
    const [count, setCount] = useState(0);

    return (
        <div className="project-container">
            <h2>Counter</h2>
            <div className="counter-display">{count}</div>
            <div className="counter-buttons">
                <button onClick={() => setCount(count + 1)}>Increment</button>
                <button onClick={() => setCount(count - 1)}>Decrement</button>
                <button onClick={() => setCount(0)}>Reset</button>
            </div>
        </div>
    );
}

function PalindromeProject() {
    const [text, setText] = useState('');
    const [result, setResult] = useState('');

    const checkPalindrome = () => {
        const cleaned = text.toLowerCase().replace(/[^a-z0-9]/g, '');
        const reversed = cleaned.split('').reverse().join('');
        const isPalindrome = cleaned === reversed && cleaned.length > 0;
        
        if (!text) {
            setResult('Please enter some text!');
        } else if (isPalindrome) {
            setResult('"' + text + '" is a Palindrome!');
        } else {
            setResult('"' + text + '" is NOT a Palindrome!');
        }
    };

    return (
        <div className="project-container">
            <h2>Palindrome Checker</h2>
            <div className="form-group">
                <label>Enter Text</label>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="e.g., radar, racecar"
                />
            </div>
            <button onClick={checkPalindrome}>Check Palindrome</button>
            {result && <div className="display-area">{result}</div>}
        </div>
    );
}

function CalculatorProject() {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [operation, setOperation] = useState('+');
    const [result, setResult] = useState('');
    const [armstrongNum, setArmstrongNum] = useState('');
    const [armstrongResult, setArmstrongResult] = useState('');

    const calculate = () => {
        const n1 = parseFloat(num1);
        const n2 = parseFloat(num2);
        let res;
        
        switch(operation) {
            case '+': res = n1 + n2; break;
            case '-': res = n1 - n2; break;
            case '*': res = n1 * n2; break;
            case '/': res = n2 !== 0 ? n1 / n2 : 'Error: Division by zero'; break;
            default: res = 'Invalid operation';
        }
        
        setResult('Result: ' + res);
    };

    const checkArmstrong = () => {
        const num = parseInt(armstrongNum);
        if (isNaN(num) || num < 0) {
            setArmstrongResult('Please enter a valid positive number!');
            return;
        }
        
        const digits = armstrongNum.toString().split('');
        const power = digits.length;
        const sum = digits.reduce((acc, digit) => acc + Math.pow(parseInt(digit), power), 0);
        
        if (sum === num) {
            setArmstrongResult(num + ' is an Armstrong Number!');
        } else {
            setArmstrongResult(num + ' is NOT an Armstrong Number!');
        }
    };

    return (
        <div className="project-container">
            <h2>Calculator</h2>
            <div className="input-group">
                <input
                    type="number"
                    value={num1}
                    onChange={(e) => setNum1(e.target.value)}
                    placeholder="Number 1"
                />
                <select value={operation} onChange={(e) => setOperation(e.target.value)}>
                    <option value="+">+</option>
                    <option value="-">-</option>
                    <option value="*">*</option>
                    <option value="/">/</option>
                </select>
                <input
                    type="number"
                    value={num2}
                    onChange={(e) => setNum2(e.target.value)}
                    placeholder="Number 2"
                />
            </div>
            <button onClick={calculate}>Calculate</button>
            {result && <div className="display-area">{result}</div>}
            
            <hr style={{margin: '30px 0', border: '1px solid #e0e0e0'}} />
            
            <h2>Armstrong Number Checker</h2>
            <div className="form-group">
                <label>Enter Number (e.g., 153, 9474)</label>
                <input
                    type="number"
                    value={armstrongNum}
                    onChange={(e) => setArmstrongNum(e.target.value)}
                    placeholder="e.g., 153"
                />
            </div>
            <button onClick={checkArmstrong}>Check Armstrong</button>
            {armstrongResult && <div className="display-area">{armstrongResult}</div>}
        </div>
    );
}

function ThemeProject() {
    const [isDark, setIsDark] = useState(false);

    return (
        <div className={'project-container ' + (isDark ? 'dark-theme' : 'light-theme')}>
            <h2>Light/Dark Theme Toggle</h2>
            <div className="theme-container">
                <p>Current Theme: <strong>{isDark ? 'Dark' : 'Light'}</strong></p>
                <div 
                    className={'theme-toggle ' + (isDark ? 'dark' : '')}
                    onClick={() => setIsDark(!isDark)}
                >
                    <div className="theme-toggle-circle"></div>
                </div>
                <p style={{marginTop: '20px', fontSize: '0.9rem', opacity: 0.7}}>
                    Click the toggle to switch between light and dark themes!
                </p>
            </div>
        </div>
    );
}

function GoogleMapsProject() {
    const [location, setLocation] = useState('');

    const loadMap = () => {
        if (!location) return;

        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`)
            .then(res => res.json())
            .then(data => {
                if (data.length === 0) {
                    alert("Location not found");
                    return;
                }

                const lat = data[0].lat;
                const lon = data[0].lon;

                // Clear previous map
                document.getElementById("map").innerHTML = "";

                const map = L.map('map').setView([lat, lon], 13);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap'
                }).addTo(map);

                L.marker([lat, lon]).addTo(map)
                    .bindPopup(location)
                    .openPopup();
            });
    };

    return (
        <div className="project-container">
            <h2>🗺️ Map Search (Free API)</h2>

            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location..."
            />

            <button onClick={loadMap}>Search</button>

            <div id="map" style={{ height: "400px", marginTop: "20px" }}></div>
        </div>
    );
}

/*function GoogleMapsProject() {
    const [location, setLocation] = useState('');
    const [searchResult, setSearchResult] = useState('');

    const searchLocation = () => {
        if (location) {
            setSearchResult('Searching for: ' + location);
            setTimeout(() => {
                setSearchResult('Location "' + location + '" found on map! (In a real app, the map would display here with Google Maps API)');
            }, 1000);
        }
    };

    return (
        <div className="project-container">
            <h2>Google Maps Integration</h2>
            <div className="form-group">
                <label>Search Location</label>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., New York, Eiffel Tower"
                />
            </div>
            <button onClick={searchLocation}>Search on Map</button>
            {searchResult && <div className="message info">{searchResult}</div>}
            <div className="map-container">
                <p>Map Display Area<br/>(Google Maps API integration required)</p>
            </div>
        </div> 

    );
    
} */ 

 /* function WeatherProject() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);

    const getWeather = () => {
        if (!city) return;
        
        setLoading(true);
        setTimeout(() => {
            setWeather({
                city: city,
                temperature: Math.floor(Math.random() * 30) + 10,
                condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
                humidity: Math.floor(Math.random() * 40) + 40,
            });
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="project-container">
            <h2>Weather API</h2>
            <div className="form-group">
                <label>Enter City Name</label>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g., London, Tokyo, New York"
                />
            </div>
            <button onClick={getWeather} disabled={loading}>
                {loading ? 'Loading...' : 'Get Weather'}
            </button>
            
            {weather && (
                <div className="weather-card">
                    <h3>{weather.city}</h3>
                    <div className="temperature">{weather.temperature} C</div>
                    <p>{weather.condition}</p>
                    <p>Humidity: {weather.humidity}%</p>
                </div>
            )}
        </div>
    );
} */

    function WeatherProject() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const API_KEY = "f91b96d90599db4a459fb3fa397ff884";

    const getWeather = async () => {
        if (!city) return;

        setLoading(true);
        setError('');

        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );

            const data = await res.json();

            if (data.cod !== 200) {
                setError("City not found");
                setWeather(null);
            } else {
                setWeather(data);
            }

        } catch {
            setError("Error fetching weather");
        }

        setLoading(false);
    };

    return (
        <div className="project-container">
            <h2>🌤 Weather API (Live)</h2>

            <div className="form-group">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city..."
                    onKeyDown={(e) => e.key === "Enter" && getWeather()}
                />
            </div>

            <button onClick={getWeather}>
                {loading ? "Loading..." : "Get Weather"}
            </button>

            {error && <p style={{color: "red"}}>{error}</p>}

            {weather && (
                <div className="weather-card">
                    <h3>{weather.name}, {weather.sys.country}</h3>

                    <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt="icon"
                    />

                    <div className="temperature">
                        {weather.main.temp} °C
                    </div>

                    <p>{weather.weather[0].description}</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Wind: {weather.wind.speed} km/h</p>
                </div>
            )}
        </div>
    );
}

function App() {
    const [currentProject, setCurrentProject] = useState(null);

    const projects = [
        { 
            id: 'login', 
            name: 'Login & Registration', 
            icon: '🔐', 
            description: 'User authentication system with login and registration forms',
            component: LoginProject 
        },
        { 
            id: 'stopwatch', 
            name: 'Stopwatch', 
            icon: '⏱️', 
            description: 'Digital stopwatch with start, pause, and reset functionality',
            component: StopwatchProject 
        },
        { 
            id: 'counter', 
            name: 'Counter', 
            icon: '🔢', 
            description: 'Simple counter with increment, decrement, and reset buttons',
            component: CounterProject 
        },
        { 
            id: 'palindrome', 
            name: 'Palindrome Checker', 
            icon: '🔄', 
            description: 'Check if a word or phrase reads the same forwards and backwards',
            component: PalindromeProject 
        },
        { 
            id: 'calculator', 
            name: 'Calculator & Armstrong', 
            icon: '🧮', 
            description: 'Basic calculator and Armstrong number checker',
            component: CalculatorProject 
        },
        { 
            id: 'theme', 
            name: 'Light/Dark Theme', 
            icon: '🌓', 
            description: 'Toggle between light and dark themes with smooth animations',
            component: ThemeProject 
        },
        { 
            id: 'maps', 
            name: 'Google Maps API', 
            icon: '🗺️', 
            description: 'Location search and map display integration',
            component: GoogleMapsProject 
        },
        { 
            id: 'weather', 
            name: 'Weather API', 
            icon: '🌤️', 
            description: 'Real-time weather information for any city',
            component: WeatherProject 
        },
    ];

    const CurrentComponent = currentProject ? 
        projects.find(p => p.id === currentProject).component : null;

    return (
        <div className="app">
            {!currentProject ? (
                <>
                    <header className="header">
                        <h1>Anjali's Portfolio</h1>
                        <p>Click on any project to see it in action!</p>
                    </header>
                    <div className="dashboard">
                        {projects.map((project, index) => (
                            <div 
                                key={project.id} 
                                className="project-card"
                                onClick={() => setCurrentProject(project.id)}
                                style={{animationDelay: (index * 0.1) + 's'}}
                            >
                                <div className="project-icon">{project.icon}</div>
                                <h3>{project.name}</h3>
                                <p>{project.description}</p>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="project-view">
                    <button className="back-button" onClick={() => setCurrentProject(null)}>
                        Back to Dashboard
                    </button>
                    {CurrentComponent && <CurrentComponent />}
                </div>
            )}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
