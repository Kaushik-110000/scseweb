"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin } from "lucide-react";

export interface Member {
    name: string;
    role: string;
    image: string;
    contact: string;
    email: string;
    linkedin: string;
}

const members: Member[] = [
    {
        name: "Abhijeet Kumar Trivedi",
        role: "Web Lead",
        image: "/images/20240616_222405_resized - Abhijeet kumar Trivedi.jpg", // TODO: add image path
        contact: "6202076965",
        email: "abhijeettrivedi3064@gmail.com",
        linkedin: "https://www.linkedin.com/in/abhijeet-kumar-trivedi-329b90258?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
        name: "Hamad Ahmad Ansari",
        role: "Creative Head",
        image: "/images/profile_pic - Hamad Ansari.jpg", // TODO: add image path
        contact: "+91-74628-85920",
        email: "hamad.ansarif90@gmail.com",
        linkedin: "https://www.linkedin.com/in/hamad-a-ansari/",
    },
    {
        name: "Pronajit Sarkar",
        role: "Corporate and affairs",
        image: "/images/20250117_151833 - Pronajit Sarkar.jpg", // TODO: add image path
        contact: "8617406246",
        email: "spronajit@gmail.com",
        linkedin: "https://www.linkedin.com/in/pronajit-sarkar-81b07321a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
        name: "Subham Roy",
        role: "EVENT MANAGEMENT HEAD",
        image: "/images/Screenshot 2025-03-30 162229 - SUBHAM.png", // TODO: add image path
        contact: "8125263711",
        email: "2022ugcs019@nitjsr.ac.in",
        linkedin: "https://www.linkedin.com/in/subham-roy-7712b8275?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
        name: "Ranvijay Singh",
        role: "PR HEAD",
        image: "/images/best - Ranvijay Singh.jpg", // TODO: add image path
        contact: "7070790240",
        email: "ranvijay255217@gmail.com",
        linkedin: "https://www.linkedin.com/in/ranvijay-singh-b06966289",
    },
    {
        name: "Sahil Kumar Das",
        role: "App Team",
        image: "/images/IMG_20250330_164353 - Sahil Kumar Das.jpg", // TODO: add image path
        contact: "9608959922",
        email: "sahilkumardas96089@gmail.com",
        linkedin: "https://www.linkedin.com/in/sahil-kumar-das-a3974528a",
    },
    {
        name: "Manish Dhakad",
        role: "PR Head",
        image: "/images/1707223269257 - MANISH DHAKAD.jpg", // TODO: add image path
        contact: "8269782105",
        email: "manishdhakad1105@gmail.com",
        linkedin: "https://www.linkedin.com/in/manish-dhakad-51a42528a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
        name: "Shubhra Kanti Roy",
        role: "Event Head",
        image: "/images/IMG-20240610-WA0170 - Shubhra kanti Roy.jpg", // TODO: add image path
        contact: "7001054760",
        email: "royshubhrakanti@gmail.com",
        linkedin: "https://www.linkedin.com/in/shubhra-kanti-roy-0520222a0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
        name: "Suryansh Singh",
        role: "Event Management Head",
        image: "/images/IMG-20240614-WA0024 - Suryansh Singh.jpg", // TODO: add image path
        contact: "9005199878",
        email: "singh.suryansh064@gmail.com",
        linkedin: "https://www.linkedin.com/in/suryansh-singh-8932062aa/",
    },
    {
        name: "Shivam Kumar",
        role: "Tech Team",
        image: "/images/20241225_162806 - Shivam Kumar.jpg", // TODO: add image path
        contact: "7488542587",
        email: "2022ugcs030@nitjsr.ac.in",
        linkedin: "https://www.linkedin.com/in/shivam-nit?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
        name: "Sulochan Khadka",
        role: "Web Team Lead",
        image: "/images/Screenshot_2025-03-31-00-00-29-312_com.miui.gallery - sulochan khadka.jpg", // TODO: add image path
        contact: "7480831843",
        email: "sulochankhadka25@gmail.com",
        linkedin: "https://www.linkedin.com/in/sulochan-khadka",
    },
    {
        name: "Pratap Kumar",
        role: "Technical Team",
        image: "/images/IMG_20250129_194206 - PRATAP KUMAR.jpg", // TODO: add image path
        contact: "7061400771",
        email: "2022ugcs076@nitjsr.ac.in",
        linkedin: "https://www.linkedin.com/in/pratap-kr",
    },
];


const OurMembers: React.FC = () => {
    return (
        <section className="mt-20 mb-25">
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
            >
                Our Members
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-gray-300 text-lg mx-16 text-center mb-10"
            >
                Meet the vibrant force behind SCSE – our passionate team members!
                From budding developers to creative minds and strategic thinkers, this diverse crew brings energy, dedication, and fresh perspectives to every initiative. They are the driving spark behind our events, tech builds, designs, and outreach efforts. With their enthusiasm and teamwork, they turn ideas into impact and keep SCSE moving forward.


            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {members.map((member, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20 flex flex-col items-center text-center"
                    >
                        <div className="relative w-32 h-32 mb-4">
                            <Image
                                src={member.image}
                                alt={member.name}
                                fill
                                className="object-cover rounded-full border-4 border-purple-500"
                            />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                        <p className="text-purple-400 mb-4">{member.role}</p>
                        <div className="space-y-2">
                            <div className="flex items-center justify-center gap-2">
                                <Phone className="h-5 w-5 text-purple-400" />
                                <a href={`tel:${member.contact.replace(/\s+/g, "")}`} className="text-gray-300 hover:text-white text-sm">
                                    {member.contact}
                                </a>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <Mail className="h-5 w-5 text-purple-400" />
                                <a href={`mailto:${member.email}`} className="text-gray-300 hover:text-white text-sm">
                                    {member.email}
                                </a>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <Linkedin className="h-5 w-5 text-purple-400" />
                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white text-sm">
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default OurMembers;
