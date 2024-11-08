import { motion } from 'framer-motion';
import { Users, Heart, Globe, Award, Zap, Shield } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

const values = [
  {
    icon: Heart,
    title: 'Compassion',
    description: 'Treating every individual with care and understanding.',
  },
  {
    icon: Shield,
    title: 'Integrity',
    description: 'Maintaining the highest standards of honesty and ethics.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Building strong relationships and fostering connection.',
  },
  {
    icon: Award,
    title: 'Quality',
    description: 'Delivering excellence in everything we do.',
  },
  {
    icon: Globe,
    title: 'Sustainability',
    description: 'Creating positive impact for future generations.',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'Continuously evolving and improving our approach.',
  },
];

const team = [
  {
    name: 'Sarah Johnson',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    bio: 'Visionary leader with 15+ years in wellness and community building.',
  },
  {
    name: 'Michael Chen',
    role: 'Head of Operations',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    bio: 'Operations expert bringing efficiency to our wellness programs.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Wellness Director',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400',
    bio: 'Certified wellness coach passionate about holistic health.',
  },
];

const AboutUs = () => {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1571624436279-b272aff752b5?auto=format&fit=crop&q=80&w=1920')",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <motion.div
          className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Empowering Wellness
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Creating spaces for growth, healing, and transformation
          </motion.p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe in the transformative power of self-care and community support. Our mission is to create an inclusive space where individuals can nurture their well-being, connect with others, and thrive in their wellness journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            {...fadeIn}
          >
            Our Core Values
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-background rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <value.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            {...fadeIn}
          >
            Meet Our Team
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className="group relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <div className="relative overflow-hidden rounded-xl aspect-[3/4]">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center"
            {...fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Story</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Founded in 2020 amidst global changes, AuraMoms emerged from a vision to create a sanctuary for holistic well-being. What began as a small community has grown into a movement, touching lives and fostering connections across the globe.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Today, we continue to evolve and grow, guided by our commitment to authentic care and continuous innovation in wellness practices. Our journey is a testament to the power of community and the transformative impact of mindful living.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;