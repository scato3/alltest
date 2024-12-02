"use client";

import React, { useEffect, useState } from "react";

interface Props {
  user: string;
}

function FunctionalComponent(props: Props) {
  const showMessage = () => {
    alert("Hello " + props.user);
  };

  const handleClick = () => {
    setTimeout(showMessage, 3000); // 3초 후 실행
  };

  return <button onClick={handleClick}>Follow (Functional)</button>;
}

class ClassComponent extends React.Component<Props, {}> {
  private showMessage = () => {
    alert("Hello " + this.props.user);
  };

  private handleClick = () => {
    setTimeout(this.showMessage, 3000); // 3초 후 실행
  };

  public render() {
    return <button onClick={this.handleClick}>Follow (Class)</button>;
  }
}

export default function Home() {
  const [user, setUser] = useState("haha");

  useEffect(() => {
    setTimeout(() => {
      setUser("hoho");
    }, 2000);
  }, []);

  return (
    <>
      <FunctionalComponent user={user} />
      <ClassComponent user={user} />
    </>
  );
}
