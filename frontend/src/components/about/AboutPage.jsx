// import Image from 'next/image';
import './about.css'; // Import the external CSS file

export default function AboutPage() {
  return (
    <div className="about-container">
      <h1 className="about-title">About Shirt Customizer</h1>
      <div className="about-grid">
        <div className="about-content">
          <p>
            Welcome to Shirt Customizer, your premier destination for unique, personalized shirt designs. Since 2025, we've been empowering individuals and businesses to express their creativity through custom apparel.
          </p>
          <p>
            Our platform offers a range of features designed to make your shirt customization experience seamless and enjoyable:
          </p>
          <ul className="about-list">
            <li>Browse public designs for inspiration</li>
            <li>Create your own designs with our user-friendly design tool</li>
            <li>Choose from a variety of shirt colors and styles</li>
            <li>Share your designs with the community</li>
            <li>Easy ordering and secure checkout process</li>
          </ul>
          <p>
            Whether you're creating a unique piece for yourself, designing team uniforms, or launching a new merchandise line, Shirt Customizer is here to bring your vision to life.
          </p>
        </div>
        <div className="about-image-container">
          {/* <Image
            src="/placeholder.svg"
            alt="About shirt Customizer"
            layout="fill"
            objectFit="cover"
          /> */}
        </div>
      </div>
    </div>
  );
}
